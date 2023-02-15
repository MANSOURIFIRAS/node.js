console.log('debut');
setTimeout(()=>{
    console.log("hi after 1 seconds")
    setTimeout(()=>{
        console.log("hi after 2 seconds")
    }, 2000);
    
}, 2000);

console.log("fin");
