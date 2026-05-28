function getSubmodules(modules, rota) {
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

export {getSubmodules}