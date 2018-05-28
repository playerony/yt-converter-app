function importAll(r) {
    return r.keys().map(r)
}
          
export default importAll(require.context('../other/img/', false, /\.(png|jpe?g|svg)$/))