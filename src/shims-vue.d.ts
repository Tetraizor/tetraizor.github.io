// For Vue components
declare module "*.vue" {
  import { DefineComponent } from "vue";
  const component: DefineComponent<{}, {}, any>;
  export default component;
}

// For JavaScript files
declare module "*.js" {
  const value: any;
  export default value;
}
