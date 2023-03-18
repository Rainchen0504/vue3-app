import { createApp } from "vue";
import App from "./App.vue";

let instance = null;
function render() {
  instance = createApp(App).mount("#vue3-app");
}

// 动态添加publicPath
// if (window.__POWERED_BY_QIANKUN__) {
//   __webpack_public_path__ = window.__INJECTED_PUBLIC_PATH_BY_QIANKUN__;
// }
// 默认独立运行
if (!window.__POWERED_BY_QIANKUN__) {
  render();
}

// 父应用加载子应用，子应用必须暴露三个接口：bootstrap,mount,unmount

/**
 * required
 * bootstrap z只会在微应用初始化时调用一次，下次微应用重新进入时会直接调用mount钩子，不会再重复触发，bootstrap.
 * 通常我们可以在这里做一些全局变量的初始化，比如不会在unmount 阶段被销毁的应用级别的缓存等。
 *
 */

export async function bootstrap(props) {
  console.log("bootstrap:", props);
}
/**
 * required
 * 应用每次进入都会调用mount方法，通常我们在这里触发应用渲染方法
 */
export async function mount(props) {
  console.log("mount:", props);
  render(props);
}

/**
 * required
 * 应用每次 切出/卸载 都会调用的方法
 * 通常我们会卸载微应用的应用实例
 */
export async function unmount(props) {
  console.log("unmount:", props);
  instance.$destroy?.();
  instance = null;
}
/**
 * not required
 * 仅使用 loadMicroApp 方式加载微应用时生效
 */
export async function update(props) {
  console.log("update props", props);
}
