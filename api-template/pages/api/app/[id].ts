import prisma from "../../../lib/prisma";

export default async function handle(req, res) {
  const postId = req.query.id;
  if (req.method === "DELETE") {
    const post = await prisma.app.delete({
      where: { id: postId },
    });
    res.json(post);
  } else if (req.method === "PUT") {
    const {
      title,
      name,
      description,
      meta,
      favicon,
      image,
      password,
      passwordProtectionMessage,
      type,
      published,
      draft,
      marketplace,
      spaces,
      subdomain,
      customDomain,
    } = req.body;
    const post = await prisma.app.update({
      where: { id: postId },
      data: {
        title,
        name,
        description,
        meta,
        favicon,
        image,
        password,
        passwordProtectionMessage,
        type,
        published,
        draft,
        marketplace,
        spaces,
        subdomain,
        customDomain,
      },
    });
    res.json(post);
  } else {
    throw new Error(
      `The HTTP ${req.method} method is not supported at this route.`
    );
  }
}
