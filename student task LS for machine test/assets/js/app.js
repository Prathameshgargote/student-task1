const cl=console.log;


const stdContainer=document.getElementById("stdcontainer");
const submitBtn = document.getElementById("submitBtn");
const updateBtn = document.getElementById("updateBtn");
const noStd=document.getElementById("noStd");
const stdTable=document.getElementById("stdTable");
const stdForm=document.getElementById("stdForm");
const fnameControl=document.getElementById("fname");
const lnameControl=document.getElementById("lname");
const emailControl=document.getElementById("email");
const contactControl=document.getElementById("contact");





const templatingOfStd = (arr) =>{
   
    let res=``;

arr.forEach((std ,i)=>{
    res+=`      <tr id="${std.stdId}">
                    <td>${i+1}</td>
                    <td>${std.fname}</td>
                    <td>${std.lname}</td>
                    <td>${std.email}</td>
                    <td>${std.contact}</td>
                    <td>
                    <button class="btn btn-primary btn-sm bg-primary" onclick="onEdit(this)">Edit</button>
                    </td>
                    <td>
                    <button class="btn btn-danger btn-sm" onclick="onRemove(this)">Remove</button>
                    </td>
                </tr>`
})
stdContainer.innerHTML=res;



}
let stdArr = JSON.parse(localStorage.getItem('stdArr')) ||[] //cheks if any thing is present in array or else return empty array
if(stdArr.length>0){
    templatingOfStd(stdArr)   //if length of array is grater than 0 then only templating is done
}else{
    stdTable.classList.add("d-none");
    noStd.classList.remove('d-none')
    
}
const generateUuid = () => {
    return (
        String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
    ).replace(/[xy]/g, (character) => {
        const random = (Math.random() * 16) | 0;
        const value = character === "x" ? random : (random & 0x3) | 0x8;
        return value.toString(16);
    });
 };


const onEdit = (ele) =>{
    
       let editId=ele.closest('tr').id;
       cl(editId)
   
      localStorage.setItem("editId",editId);

       let editObj=stdArr.find(std =>{
        return std.stdId === editId
       })
       cl(editObj)
       fnameControl.value=editObj.fname
       lnameControl.value=editObj.lname
       emailControl.value=editObj.email
       contactControl.value=editObj.contact

       updateBtn.classList.remove('d-none');
       submitBtn.classList.add('d-none')

                               


} 

const onUpdate = () =>{
    let updateId=localStorage.getItem('editId') 
    cl(updateId)
    let updatedObj = {    
       fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        stdId:updateId
        
        
    }
    cl(updatedObj)
    
    let getIndex=stdArr.findIndex(std => std.stdId === updateId)
    cl(getIndex)

    stdArr[getIndex]=updatedObj
    localStorage.setItem('stdArr',JSON.stringify(stdArr)); 

    let  tr=[...document.getElementById(updateId).children];

    tr[1].innerHTML = updatedObj.fname; 
    tr[2].innerHTML = updatedObj.lname; 
    tr[3].innerHTML = updatedObj.email; 
    tr[4].innerHTML = updatedObj.contact; 

    stdForm.reset(); 
    
    updateBtn.classList.add('d-none')
    submitBtn.classList.remove('d-none');

    Swal.fire({
        title:`Student with id ${updateId} info is updated successfully`,
        timer:3500,
        icon:`success`

    })


}

const onRemove = (ele) =>{
    let getConfirmmation = confirm('Are you sure you want to remove this student ?')
    cl(getConfirmmation) 
    if(getConfirmmation){
        let removeId=ele.closest('tr').id 

        let getIndex=stdArr.findIndex(std => std.stdId === removeId); 
        stdArr.splice(getIndex,1) 
        localStorage.setItem('stdArr',JSON.stringify(stdArr));
         
        ele.closest('tr').remove();

        location.reload()
        
        Swal.fire({
            title:`Student with id ${removeId} is removed successfully`,
            timer:3500,
            icon:`success`
        })
    }
}


const onstdAdd=(eve)=>{
    eve.preventDefault()
    let newStd = {
        fname:fnameControl.value,
        lname:lnameControl.value,
        email:emailControl.value,
        contact:contactControl.value,
        stdId:generateUuid()
    }
    
    cl(stdArr)
    stdArr.push(newStd);
    stdForm.reset();
    
    stdTable.classList.remove("d-none");
    noStd.classList.add('d-none')
    localStorage.setItem('stdArr',JSON.stringify(stdArr));
    
    let tr=document.createElement('tr');
    tr.id=newStd.stdId;
    tr.innerHTML=`      <td>${stdArr.length}</td>
                        <td>${newStd.fname}</td>
                        <td>${newStd.lname}</td>
                        <td>${newStd.email}</td>
                        <td>${newStd.contact}</td>
                        <td>
                        <button class="btn btn-primary btn-sm bg-or" onclick="onEdit(this)">Edit</button>
                        </td>
                        <td>
                        <button class="btn btn-danger btn-sm" onclick="onRemove(this)">Remove</button>
                        </td>`

    

stdContainer.append(tr);
Swal.fire({
    title:`New Student is ${newStd.fname} ${newStd.lname} is added Successfully`,
    timer:3500,
    icon:`success`
})
   
}

stdForm.addEventListener("submit",onstdAdd);
updateBtn.addEventListener("click",onUpdate)




