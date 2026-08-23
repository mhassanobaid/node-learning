function add(a, b){
  return a+b;
}

function sub(a,b) {
  return a-b;
}

// module.exports="HI";

                                          // one way 

// to export multile things via ONE module.exports but it takes object
// module.exports = {add, sub};

// also be done
// module.exports = {addFn: add, subFn: sub};

                                          // second way
// to export multile things via ONE OR MANY exports.func_name but it takes anonymous functions

exports.add = (a,b) => a+b;
exports.sub = (a,b) => a-b;
