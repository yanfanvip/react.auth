/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
  if (!name) return
  window.localStorage.setItem(name, JSON.stringify(content))
}

/**
 * 获取localStorage
 */
export const getStore = (name) => {
  if (!name) return
  let value = window.localStorage.getItem(name)
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
  window.localStorage.removeItem(name)
}


export default {
  setStore,
  getStore,
  removeStore
}