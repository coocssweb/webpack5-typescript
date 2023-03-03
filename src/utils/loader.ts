export const loadScript = (src: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = src;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};


export const loadPhotos = (paths: Array<String>) => {
  
}