const fs = require("fs");

let links = [
    "https://drive.google.com/file/d/1Kfz3cOAC_A4Nj-fUAYIH_MyxYo-aiMRy/view?usp=sharing",
    "https://drive.google.com/file/d/1qbv-L6Nuto8VutZHrvhLDrOmYdtXeucQ/view?usp=sharing",
    "https://drive.google.com/file/d/1Ui1eLqgs-pkcNjsr4O82XD1y6YmBj8gQ/view?usp=sharing", 
    "https://drive.google.com/file/d/1UnpGw7AsfIgSyAk7pxPKeH-j6HO8Ka6f/view?usp=sharing",
    "https://drive.google.com/file/d/1UJWGuT4YTR3-PRuc7nteYlmLPDNjqBLt/view?usp=sharing",
    "https://drive.google.com/file/d/1fH-9ttWlRwqSEIJzi-S17MMOkRGjagbR/view?usp=sharing",
    "https://drive.google.com/file/d/19LjFUm0QjVSiOorvDOVaqyUw-1zjrsIf/view?usp=sharing",
    "https://drive.google.com/file/d/1EhSXdOGbwqJiGbnzjCvAMRf1GOJP9XCu/view?usp=sharing",
    "https://drive.google.com/file/d/1Q8JQeqJ-Qoh1NeYauVRuL-05JhdgwNl0/view?usp=sharing",
    "https://drive.google.com/file/d/1p2rQn3SXTNi_FwUtZo2DdZGTXwH01Q10/view?usp=sharing",
    "https://drive.google.com/file/d/1HxjnklF3cCtb8OmhVDkefmKxzebLzRQm/view?usp=sharing",
    "https://drive.google.com/file/d/1e2pBVyGmW22jrOlWgLJfAB4DmhnKAm45/view?usp=sharing",
    "https://drive.google.com/file/d/1OzHzNSCYz84ZrU-mcV_-X7P8f43Z9xg3/view?usp=sharing",
    "https://drive.google.com/file/d/1egyZfLs03mknzAgpF0_9Q0RatTrXuSUO/view?usp=sharing",
    "https://drive.google.com/file/d/16iN9S7QJy-XOvdQpDhyo6JAd4APG_sgZ/view?usp=sharing",
    "https://drive.google.com/file/d/1KYlZLSrEPHSjysE8cxpAs2G1QLhrF5-z/view?usp=sharing",
    "https://drive.google.com/file/d/1B2alq_N_E7XERZIAGNQfRJFjYv5ijl3V/view?usp=sharing",
    "https://drive.google.com/file/d/1J2bl3Jy9staX6i61hjHgCTzZUrT_8iM9/view?usp=sharing",
    "https://drive.google.com/file/d/1i_1_QMkmmFnOZGIeBYYrlSBjBmSK7HXM/view?usp=sharing",
    "https://drive.google.com/file/d/1uYPh9SD6CSfT1CQHwUhXjSsC5jhTuV5U/view?usp=sharing",
    "https://drive.google.com/file/d/1cjFchIX5MJeQl8Na2ir100liduqA8xFr/view?usp=sharing",
    "https://drive.google.com/file/d/1zJb6xB8BQapQF_jQmNkCrHZ9fI4foHLU/view?usp=sharing",
    "https://drive.google.com/file/d/1bVMtX_9KShC8Ya1PK9gER7UCqT9G9Wmi/view?usp=sharing",
    "https://drive.google.com/file/d/1v-0GX0DOkneeKJXLb4NIE6sf_Cgzy_Cd/view?usp=sharing",
    "https://drive.google.com/file/d/1ONzyL7NvkjwUL_JTvyASgCSR2egnYb_e/view?usp=sharing",
    "https://drive.google.com/file/d/1kPJ8P_GbHABAFHVKIvAbZ47G60MMLK5t/view?usp=sharing",
    "https://drive.google.com/file/d/1tMydErmgEH6Oy7gxa1kyyp3SjFEMVeXm/view?usp=sharing",
    "https://drive.google.com/file/d/1y5in4MbjmB50qhwAu_48AtMHywOLk4hz/view?usp=sharing",
    "https://drive.google.com/file/d/10_rT2jvLrlkF2O4T7AD3K4lNGns4YMnj/view?usp=sharing", 
    "https://drive.google.com/file/d/1pHDMZc9CEMAIyYgqfR0DEX-nkaH01T_6/view?usp=sharing",
    "https://drive.google.com/file/d/1BceaFX8XIhRBTsCg9M8wkjigPcDpdVFr/view?usp=sharing", 
    "https://drive.google.com/file/d/1PnxD9JBrjULcY6jtb4qGXfe6OYGodCdE/view?usp=sharing"
    

]





const handlingJson = (req, res) => {
  let modifyingLink = "http://drive.google.com/uc?export=view&id=";
  let newLinks = [];

  const buffer=fs.readFileSync('./utils/data.json')
  const content=buffer.toString()
  const dataArr=Array.from(JSON.parse(content))
  
  
  links.map((link) => {
    let l = link.slice(32, 65);
    let modifiedLink = modifyingLink.concat(l);
    newLinks.push(modifiedLink);
  });
  
  let i=0
  dataArr.map((item)=>{
    item.img1=newLinks[i];
    item.img2=newLinks[i+1];
    item.label=item.label[0]
    delete item.id
    i+=2
  })
  console.log(dataArr)

  fs.writeFile('newData.json',JSON.stringify(dataArr), (err)=>{
    if(err) throw new Error(err)

    console.log("file created successfully")
  })

};

module.exports = handlingJson;
