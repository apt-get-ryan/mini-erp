 function getModuleTree(modules: any[]) {
  const tree = [], map = {};
  modules.forEach( m => {
    map[m.id] = {...m, submodules: []}
  });
  modules.forEach(m => {
    if(m.parent_id != null && map[m.parent_id]) {
      map[m.parent_id]?.submodules.push(map[m.id]);
    } else {
      tree.push(map[m.id])
    }
  })
  return tree;
 }

function getSubmodules(modules, rota) {
  if(rota == "/") {
    return modules;
  }
  for (const mod of modules) {
    if(mod.rota === rota)
      return mod.submodules;

    if(mod.submodules) {
      const found = getSubmodules(mod.submodules, rota);
      if(found)
        return { ...found.submodules }
    }
  }
  return null;
}

export {getSubmodules, getModuleTree}