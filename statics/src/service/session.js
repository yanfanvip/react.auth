/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  window.sessionStorage.setItem(name, JSON.stringify(content))
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
  let value = window.sessionStorage.getItem(name)
  if(value != null){
    return JSON.parse(value)
  }
  return null
}

/**
 * 删除localStorage
 */
export const removeStore = (name) => {
  if (!name) return
  window.sessionStorage.removeItem(name)
}


export default {
  setStore,
  getStore,
  removeStore
}