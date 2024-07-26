import { Toolkit } from "actions-toolkit";
import createOrUpdateRef from "./create-or-update-ref";
import updateTag from "./update-tag";
import getTagName from "./get-tag-name";

const semver = require("semver");

export default async function buildAndTagAction(tools: Toolkit) {
  // Get the tag to update
  const tagName = getTagName(tools);
  tools.log.info(`Updating tag [${tagName}]`);

  // Get current commit
  var origTag = tagName
  if (tools.inputs.prefix) {
    origTag = tagName.replace(tools.inputs.prefix, 'v')
  }
  tools.log.info(`Fetching current commit tag [${origTag}]`);

  // Get ref data
  const refData = await tools.github.git.getRef({
    ...tools.context.repo,
    ref: `tags/${origTag}`,
  });

  // Get current commit
  const commit = await tools.github.git.getCommit({
    ...tools.context.repo,
    commit_sha: refData.data.object.sha,
  });

  // Update the tag to point to the new commit
  await createOrUpdateRef(tools, commit.data.sha, tagName);

  // Also update the major and minor version tag.
  // For example, for version v1.1.1, we'd also update v1 and v1.1
  let shouldRewriteMajorAndMinorRef = true;

  // Skip modifying tags on the draft and pre-release events
  if (tools.context.event === "release") {
    const { draft, prerelease } = tools.context.payload.release;
    if (draft || prerelease) {
      shouldRewriteMajorAndMinorRef = false;
    }
  }

  if (shouldRewriteMajorAndMinorRef) {
    const prefix = tools.inputs.semver_prefix || tools.inputs.prefix;
    const majorStr = semver.major(tagName.replace(prefix, '')).toString();
    const minorStr = semver.minor(tagName.replace(prefix, '')).toString();
    await createOrUpdateRef(tools, commit.data.sha, `${prefix}${majorStr}.${minorStr}`);
    return createOrUpdateRef(tools, commit.data.sha, `${prefix}${majorStr}`);
  }
}
