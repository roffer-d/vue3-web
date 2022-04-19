let components = []
const custom = require.context('@/components', true, /\.vue$/);
custom.keys().forEach((key)=>{
    components = components.concat(custom(key).default)
})

export default (app) =>{
    components.forEach(component=>{
        app.component(component.name,component)
    })
}