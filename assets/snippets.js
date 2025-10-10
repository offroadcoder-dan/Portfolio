// Lightweight HTML snippet loader with simple templating and script execution
// Usage: <div data-include="header"></div> will load snippets/header.html
// Supports template tokens like {{title}} replaced from data attributes on the placeholder.

(function(){
  async function fetchText(url){
    const res = await fetch(url, { credentials: 'same-origin' });
    if(!res.ok){
      throw new Error(`Failed to load snippet: ${url} (${res.status})`);
    }
    return await res.text();
  }

  function applyTemplate(html, dataset){
    return html.replace(/{{\s*([\w-]+)\s*}}/g, (_, key) => {
      return dataset && key in dataset ? dataset[key] : '';
    });
  }

  function executeAndReplaceScripts(container){
    const scripts = Array.from(container.querySelectorAll('script'));
    scripts.forEach((oldScript) => {
      const s = document.createElement('script');
      // copy attributes
      for (const { name, value } of Array.from(oldScript.attributes)) {
        s.setAttribute(name, value);
      }
      if (oldScript.src) {
        s.src = oldScript.src;
      } else {
        s.textContent = oldScript.textContent || '';
      }
      oldScript.replaceWith(s);
    });
  }

  async function loadInto(placeholder){
    const raw = placeholder.getAttribute('data-include');
    if(!raw) return;
    const url = raw.endsWith('.html') ? raw : `snippets/${raw}.html`;
    const text = await fetchText(url);
    const html = applyTemplate(text, placeholder.dataset);
    const tmp = document.createElement('div');
    tmp.innerHTML = html;
    executeAndReplaceScripts(tmp);
    // replace placeholder with loaded nodes
    const nodes = Array.from(tmp.childNodes);
    placeholder.replaceWith(...nodes);
  }

  async function processIncludes(root=document){
    const placeholders = Array.from(root.querySelectorAll('[data-include]'));
    if(placeholders.length === 0) return;
    await Promise.all(placeholders.map(loadInto));
    // Process nested includes recursively until none left
    return processIncludes(root);
  }

  function postInit(){
    const yearEl = document.getElementById('year');
    if(yearEl){
      yearEl.textContent = new Date().getFullYear();
    }
  }

  if(document.readyState === 'loading'){
    document.addEventListener('DOMContentLoaded', () => {
      processIncludes().then(postInit).catch(console.error);
    });
  } else {
    processIncludes().then(postInit).catch(console.error);
  }
})();

