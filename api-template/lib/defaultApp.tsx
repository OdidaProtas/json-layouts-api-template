const helloWorld = {
  layout: "page",
  name: "Hello World",
  path: "/",
  components: [
    {
      type: "box",
      data: {
        components: [
          {
            type: "box",
            data: {
              components: [],
            },
          },
        ],
      },
    },
  ],
  opts: {
    appbar: {
      logo: {
        type: "text",
        content: "Spaces",
      },
      navItems: [
        {
          text: "Home",
          page: "/",
        },
      ],
    },
  },
};

export default helloWorld;
