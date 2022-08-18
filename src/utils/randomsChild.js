process.on("message", (message) => {
  num = message;
  let result = ramdomsChild(message);
  process.send(JSON.stringify(result));
});

function ramdomsChild(req, res) {
  try {
    let container = [];
    let repeat = {};

    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    //Genera N cantidad de num aleatorios
    for (let index = 0; index < num; index++) {
      let result = getRandomInt(1000);
      container.push(result);
    }

    //Agrupa 
    container.forEach(function (numero) {
        repeat[numero] = (repeat[numero] || 0) + 1;
    });
    return repeat;
  } catch (err) {
    console.log(err);
  }
}