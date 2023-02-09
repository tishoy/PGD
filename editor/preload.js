// All of the Node.js APIs are available in the preload process.
// It has the same sandbox as a Chrome extension.
window.addEventListener('DOMContentLoaded', () => {


	const replaceText = (selector, text) => {
    const element = document.getElementById(selector)
    if (element) element.innerText = text
  }

  for (const type of ['chrome', 'node', 'electron']) {
    replaceText(`${type}-version`, process.versions[type])
  }
  // <link href=./css/app.9ad0a4ef.css rel=preload as=style>
  // <link href=./js/app.6cc220ac.js rel=preload as=script>
  // <link href=./js/chunk-vendors.3a47e9ee.js rel=preload as=script>


  // var node1 = document.createElement("link");
  // node1.href = "./css/app.9ad0a4ef.css";
  // node1.rel = "preload";
  // node1.as = "style";
  // document.insertBefore(node1, document.getElementsByName("head"));
  // var node2 = document.createElement("link");
  // node1.href = "./css/app.9ad0a4ef.css";
  // node2.rel = "preload";
  // node2.as = "script";
  // document.insertBefore(node2, document.getElementsByName("head"));
  // var node3 = document.createElement("link");
  // node3.href = "./css/app.9ad0a4ef.css";
  // node3.rel = "preload";
  // node3.as = "script";
  // document.insertBefore(node3, document.getElementsByName("head"));
})
