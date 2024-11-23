export function loadScript(src: string, position: HTMLElement | null, id: string) {
  if (!position || !id || document.querySelector(id)) {
    return;
  }

  const s = document.createElement("script");
  s.setAttribute("async", "");
  s.setAttribute("id", id);
  s.src = src;
  position.appendChild(s);

  return new Promise<void>((resolve) => {
    s.onload = (s as any).onreadystatechange = function () {
      if (!this.readyState || this.readyState == "complete") {
        resolve();
      }
    };
  });
}
