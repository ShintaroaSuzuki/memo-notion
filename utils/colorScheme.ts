export const colorScheme = (mode: boolean) => {
    return mode
        ? {
              backgroundColor: '#2f3336',
              fontColor: '#ebebeb',
              borderColor: '#777',
              textInputColor: '#454A4D',
              placeholderColor: '#aaa',
              activeColor: '#03dac4',
              deactiveColor: '#777',
              urlColor: '#ccc'
          }
        : {
              backgroundColor: '#fff',
              fontColor: '#000',
              borderColor: '#eee',
              textInputColor: '#eee',
              placeholderColor: '#999',
              activeColor: '#007aff',
              deactiveColor: '#ccc',
              urlColor: '#777'
          };
};
