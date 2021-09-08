export const colorScheme = (mode: boolean) => {
    return mode
        ? {
              backgroundColor: '#333',
              fontColor: '#eee',
              borderColor: '#777',
              textInputColor: '#555',
              placeholderColor: '#aaa',
              activeColor: '#03dac4',
              deactiveColor: '#777'
          }
        : {
              backgroundColor: '#fff',
              fontColor: '#000',
              borderColor: '#eee',
              textInputColor: '#eee',
              placeholderColor: '#999',
              activeColor: '#007aff',
              deactiveColor: '#ccc'
          };
};
