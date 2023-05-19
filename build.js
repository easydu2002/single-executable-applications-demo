

const { build } = require('esbuild')
const { exec } = require('child_process')

// support windows
build({
  entryPoints: ['src/hello.js'],
  outfile: 'build/app.js',
  format: 'cjs',
  bundle: true,
  minify: true,
})
.then(() => {
  // copy node
  return new Promise((resolve, reject) => {
    exec(`npm run g:node`, (err, stdout, stderr) => {
      if (err) {
        return reject(stderr)
      }
      resolve()
    })
  })
})
.then(() => {
  // generate blob
  return new Promise((resolve, reject) => {
    exec(`npm run g:blob`, (err, stdout, stderr) => {
      if (err) {
        return reject(stderr)
      }
      resolve()
    })
  })
})
.then(() => {
  // remove sign
  return new Promise((resolve, reject) => {
    exec(`npm run sign:rm`, (err, stdout, stderr) => {
      if (err) {
        return reject(stderr)
      }
      resolve()
    })
  })
})
.then(() => {
  // inject blob
  return new Promise((resolve, reject) => {
    exec(`npm run inject`, (err, stdout, stderr) => {
      if (err) {
        return reject(stderr)
      }
      resolve()
    })
  })
})
.then(() => {
  console.log('done.')
})
.catch(console.trace)