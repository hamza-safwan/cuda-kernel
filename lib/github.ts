export async function fetchGithubReadme(opts: {
  owner: string;
  repo: string;
  branch?: string;
}): Promise<{ content: string; branch: string } | null> {
  const branches = opts.branch ? [opts.branch] : ["main", "master"];
  for (const branch of branches) {
    try {
      const res = await fetch(
        `https://raw.githubusercontent.com/${opts.owner}/${opts.repo}/${branch}/README.md`,
        { next: { revalidate: 3600 } }
      );
      if (res.ok) return { content: await res.text(), branch };
    } catch {
      // ignore and try next
    }
  }
  return null;
}

export function resolveReadmeAssetUrl(params: {
  owner: string;
  repo: string;
  branch: string;
  src: string;
}) {
  const { owner, repo, branch, src } = params;
  try {
    const url = new URL(src);
    return url.toString();
  } catch {
    // relative path -> point to raw
    return `https://raw.githubusercontent.com/${owner}/${repo}/${branch}/${src.replace(/^\/?/, "")}`;
  }
}

