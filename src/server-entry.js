import createApp from "./app";
// import { renderToString } from "@vue/server-renderer";
// const { app, router, store } = createApp();

export default async context => {
  const { app, router, store } = createApp();

  await router.push(context.url);

  await router.isReady();

  if (router.currentRoute.value.matched.length === 0) {
    context.throw(404, "Not Found");
  }

  const matchedComponents = router.currentRoute.value.matched.flatMap(record =>
    Object.values(record.components)
  );

  try {
    await Promise.all(
      matchedComponents.map(component => {
        if (component.asyncData) {
          return component.asyncData({
            store,
            route: router.currentRoute.value
          });
        }
      })
    );
  } catch (error) {
    console.log(error);
  }

  return { app, router, store };
};
