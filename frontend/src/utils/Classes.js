function mergeClassNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export {mergeClassNames};