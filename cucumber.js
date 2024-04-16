module.exports = {
  default: [
    "--publish-quiet --",
    "--require-module ts-node/register",
    "--require step-definitions/**/*.ts",
    "--format snippets:snippets.ts",
  ].join(" "),
};
