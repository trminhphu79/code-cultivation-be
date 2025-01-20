export enum CacheMessageAction {
  Create = 'cache.create',
  Update = 'cache.update',
  Delete = 'cache.delete',
  PartialUpdate = 'cache.partial-update',
  // New array-specific actions
  ArrayAdd = 'cache.array.add',
  ArrayRemove = 'cache.array.remove',
  ArrayUpdate = 'cache.array.update'
}
