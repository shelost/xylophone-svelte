import nodeResolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

export default {
  // ... other config
  plugins: [
    // ... other plugins
    nodeResolve({ preferBuiltins: true }),
    commonjs()
  ],
  external: ['stripe', 'crypto', 'events', 'http', 'https'],
};
