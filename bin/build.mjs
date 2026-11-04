#!/usr/bin/env node
/**
 * Compila styles/styles.min.css y styles/embed.min.css.
 *
 * El skin hereda de Elastic, así que necesita sus fuentes LESS:
 *   - Instalado en roundcube/skins/<skin>: usa ../elastic directamente.
 *   - Fuera de Roundcube: ELASTIC_DIR=/ruta/roundcube/skins/elastic npm run build
 *     o `npm run build -- --download` para bajar Elastic de la versión de package.json.
 */
import { readFile, writeFile, mkdtemp, cp, rm, mkdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join, dirname, basename, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { execFileSync } from 'node:child_process';
import less from 'less';
import CleanCSS from 'clean-css';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const pkg = JSON.parse(await readFile(join(root, 'package.json'), 'utf8'));
const skin = pkg.roundcube.skin;
const check = process.argv.includes('--check');

async function elasticDir() {
    if (process.env.ELASTIC_DIR) return resolve(process.env.ELASTIC_DIR);
    const sibling = resolve(root, '..', 'elastic');
    if (existsSync(join(sibling, 'styles', 'styles.less'))) return sibling;
    if (!process.argv.includes('--download')) {
        throw new Error('No encuentro Elastic. Instala el skin en roundcube/skins/ o usa ELASTIC_DIR=… o --download');
    }
    const version = pkg.roundcube.version;
    const dir = join(root, 'node_modules', '.roundcube-' + version);
    if (!existsSync(join(dir, 'skins', 'elastic'))) {
        await mkdir(dir, { recursive: true });
        const url = `https://github.com/roundcube/roundcubemail/releases/download/${version}/roundcubemail-${version}.tar.gz`;
        console.log('Descargando', url);
        const rel = 'node_modules/.roundcube-' + version;
        execFileSync('sh', ['-c', `curl -fsSL "${url}" | tar xz -C "${rel}" --strip-components=1 roundcubemail-${version}/skins/elastic`], { stdio: 'inherit', cwd: root });
    }
    return join(dir, 'skins', 'elastic');
}

const elastic = await elasticDir();

// Espacio de trabajo con la misma estructura que roundcube/skins/
const work = await mkdtemp(join(tmpdir(), 'rcskin-'));
await cp(elastic, join(work, 'elastic'), { recursive: true });
await cp(join(root, 'styles'), join(work, skin, 'styles'), { recursive: true });

let stale = 0;

for (const name of ['styles', 'embed']) {
    const file = join(work, skin, 'styles', name + '.less');
    const out = await less.render(await readFile(file, 'utf8'), {
        filename: file,
        math: 'always',
    });

    // Elastic escribe las URL relativas a su CSS final (skins/elastic/styles/):
    // lo que este skin no tenga (fuentes, iconos) se sirve desde ../../elastic/
    const css0 = out.css.replace(/url\(\s*(['"]?)\.\.\/(fonts|images)\/([^'")]+?)\1\s*\)/g, (m, q, dir, file) => {
        const local = join(root, dir, file.split(/[?#]/)[0]);
        return existsSync(local) ? m : `url(${q}../../elastic/${dir}/${file}${q})`;
    });
    const min = new CleanCSS({ level: 1 }).minify(css0);
    if (min.errors.length) throw new Error(min.errors.join('\n'));
    const css = min.styles + '\n';
    const target = join(root, 'styles', name + '.min.css');

    if (check) {
        const current = existsSync(target) ? await readFile(target, 'utf8') : '';
        if (current !== css) {
            console.error(`✗ styles/${name}.min.css no está al día (npm run build)`);
            stale++;
        } else {
            console.log(`✓ styles/${name}.min.css`);
        }
    } else {
        await writeFile(target, css);
        console.log(`✓ styles/${name}.min.css (${(css.length / 1024).toFixed(1)} KB)`);
    }
}

await rm(work, { recursive: true, force: true });
process.exit(stale ? 1 : 0);
