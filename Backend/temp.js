async function first() {
    return new Promise((resolve) => {
      
      resolve();
    });
  }
  
  async function second() {
    return new Promise((resolve) => {
        
      resolve();
    });
  }
  
  async function third() {
    console.log("3rd");
  }
  
  async function fnAsync() {
    await first();
    await second();
    third();
  }
  fnAsync();