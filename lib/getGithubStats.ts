export async function getGithubStats(username: string) {
  const res = await fetch(`https://api.github.com/users/${username}`, {
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch GitHub profile");

  const data = await res.json();

  return {
    name: data.name,
    avatar: data.avatar_url,
    bio: data.bio,
    followers: data.followers,
    following: data.following,
    publicRepos: data.public_repos,
    profileUrl: data.html_url,
  };
}
