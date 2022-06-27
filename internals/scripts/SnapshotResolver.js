module.exports = {
  testPathForConsistencyCheck: 'some/__tests__/example.test.js',

  /** resolves from test to snapshot path */
  resolveSnapshotPath: (testPath, snapshotExtension) => {
    return testPath.replace('app/', '__snapshots__/') + snapshotExtension;
  },

  /** resolves from snapshot to test path */
  resolveTestPath: (snapshotFilePath, snapshotExtension) => {
    return snapshotFilePath
      .replace('__snapshots__/', 'app/')
      .slice(0, -snapshotExtension.length);
  }
};
