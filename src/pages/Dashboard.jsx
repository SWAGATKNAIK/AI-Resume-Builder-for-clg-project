import { FilePenLineIcon, PencilIcon, PlusIcon, TrashIcon, UploadCloud, UploadCloudIcon, XIcon, } from 'lucide-react'
import React,{ useEffect, useState} from 'react'
import { dummyResumeData} from '../assets/assets'
import { useNavigate} from 'react-router-dom'


const Dashboard = () => {

  const colors = [  "#a3eb79",
    "#5be7e7",
    "#e8eb68"]

const[allResumes, setAllResumes] = useState([])
const[showCreateResume, setShowCreateResume] = useState(false)
const[showUploadResume, setShowUploadResume] = useState(false)
const[title, setTitle] = useState('')
const[resume, setResume] = useState(null)
const[editResumeId, setEditResumeId] = useState('')


const navigate = useNavigate()

const loadAllResumes = async () =>{
  setAllResumes(dummyResumeData)
}

const createResume = async (event) => {
   event.preventDefault()
   setShowCreateResume(false)
   navigate(`/app/resume-builder/${resume._id}`)
}


const uploadResume = (event) => {
  event.preventDefault()
  setShowUploadResume(false)
  navigate(`/app/resume-builder/${resume._id}`)
  }

  const editTitle = async (e) => {
    e.preventDefault();
  }


  const deleteResume = async (resumeId) => {
    const confirm = window.confirm('Are you sure you want to delete this resume?')
    if(confirm){
      setAllResumes(prev=>prev.filter(resume => resume._id !== resumeId ))
    }
   }


useEffect(() => {
  loadAllResumes()
}, [])


  return (
    <div>
      <div className="max-w-7xl mx-auto px-4 py-8">

        <p className="text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-700 bg-clip-text text-transparent">
          Welcome, Swagat Naik
        </p>

        {/* Create Resume Button */}
        <div className="flex gap-4">
          <button onClick={()=> setShowCreateResume(true)} className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed
          border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <PlusIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-indigo-300 to-indigo-500 
            text-white rounded-full" />
            <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
          </button>

          <button onClick={()=> setShowUploadResume(true)} className="w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed
          border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all duration-300 cursor-pointer">
            <UploadCloudIcon className="size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300 to-purple-500 
            text-white rounded-full" />
            <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
          </button>
        </div>
      
         <hr className='border-slate-300 my-6 sm:w-[305px]' />

        <div className="grid grid-cols-2 sm:flex flex-wrap gap-4">
          {allResumes.map((resume, index)=>{
            const baseColor = colors[index % colors.length];
            return(
              <button key={index} onClick={()=> navigate(`/app/resume-builder`)} 
              className='group relative w-full sm:max-w-36 h-48 flex flex-col items-center justify-center rounded-lg border 
               cursor-pointer transition-all duration-300 '
               style={{backgroundColor:baseColor ,
                borderColor: baseColor,
                color: "#fff"}}>


           <FilePenLineIcon className="size-7 group-hover:scale-105 transition-all" style={{ color: "#fff" }}/>
           <p className='text-sm group-hover:scale-105 transition-all px-2 text-center' style={{ color: "#fff"}}>
             {resume.title}
              </p>
           <p className='absolute bottom-1 text-[11px] text-slate-400 group-hover:text-slate-500 transition-all duration-300 px-2
           text-center' style={{ color: "#fff" }}>
            Updated on {resume?.updatedAt
            ? new 
            Date(resume.updatedAt).toLocaleDateString() 
            : "N/A"} 
           </p>
         
           <div onClick={e => e.stopPropagation()} 
           className="absolute top-2 right-2 hidden group-hover:flex items-center gap-2">
            <TrashIcon onClick={(e)=>{e.stopPropagation()
             deleteResume(resume._id || index)
            }}
             className="w-4 h-4 text-gray-600 hover:text-red-500 cursor-pointer" />
            <PencilIcon onClick={(e)=> {
              e.stopPropagation()
               setEditResumeId(resume._id || index)
               setTitle(resume.title);
              }}
             className="w-4 h-4 text-gray-600 hover:text-blue-500 cursor-pointer" />
           </div>
              </button>
            )
          })}
        </div>
       
      {showCreateResume && (
        <form onSubmit={createResume} onClick={()=> setShowCreateResume(false)}
         className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-10 flex items-center justify-center">
           <div onClick={(e) => e.stopPropagation()} className='relative bg-white rounded-lg w-full max-w-sm p-6 mx-4'>
            <h2 className='text-xl font-bold mb-4'>
              Create a Resume
            </h2>
            <input onChange={(e)=> setTitle(e.target.value)} value={title}  type="text" 
            placeholder="Enter resume title"
            className="w-full border border-grey-300 rounded px-3 py-2 mb-4 outline-none focus:border-green-500"/>

            <button className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Create Resume</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>
            {setShowCreateResume(false); setTitle('')}}/>
           </div>
        </form>
      )
}


 {showUploadResume && ( 
  <form onSubmit={uploadResume}  
  className="fixed inset-0 backdrop-blur-sm bg-black/40 z-10 flex items-center justify-center" > 
  <div onClick={(e) => e.stopPropagation()} 
  className='relative bg-white rounded-lg w-full max-w-sm p-6 mx-4 shadow-xl'> 
    <h2 className='text-xl font-bold mb-4'> Upload Resume </h2>
     <input  onChange={(e)=>setTitle(e.target.value)} value={title} type="text"
      placeholder="Enter resume title" 
     className="w-full border border-gray-300 rounded px-3 py-2 mb-4 outline-none focus:border-green-500"/>
      <div> 
        <label htmlFor="resume-input" className="block text-sm text-slate-700"> Select Resume File 
          <div className='flex flex-col items-center justify-center gap-2 border group text-slate-400 border-dashed rounded-md p-4 
          py-10 my-4 hover:border-green-500 hover:text-green-700 cursor-pointer transition-colors'> 
          {resume ? ( 
            <p className='text-green-700'>{resume.name}</p> 
            ) : (
               <> 
               <UploadCloud className='size-14 stroke-1'/> 
               <p> Upload resume </p>
                </>
               )} 
         </div> 
           <input id="resume-input" type="file" className="hidden" onChange={(e)=> setResume(e.target.files[0])}/> 
            </label> 
         
         <input type="file" id="resume-input" accept='.pdf' hidden
         onChange={(e)=> setResume(e.target.files[0])}/>

            </div> 

               <button onClick={()=>setShowUploadResume(true)} className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 
               transition-colors'>Upload Resume
               </button> 
               <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' 
               onClick={()=>
                {setShowUploadResume(false); setTitle('')}}
                 />
           </div>
        </form>    
     )}

      

      {editResumeId && (  
        <form onSubmit={editTitle} 
         className="fixed inset-0 backdrop-blur-sm bg-opacity-50 z-10 flex items-center justify-center">
           <div onClick={(e) => e.stopPropagation()} className='relative bg-white rounded-lg w-full max-w-sm p-6 mx-4'>
            <h2 className='text-xl font-bold mb-4'>
              Edit Resume Title
            </h2>
            <input onChange={(e)=> setTitle(e.target.value)} value={title}  type="text" 
            placeholder="Enter resume title"
            className="w-full border border-grey-300 rounded px-3 py-2 mb-4 outline-none focus:border-green-500"/>

            <button type="submit" className='w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 transition-colors'>Update</button>
            <XIcon className='absolute top-4 right-4 text-slate-400 hover:text-slate-600 cursor-pointer transition-colors' onClick={()=>
            {setEditResumeId(''); setTitle('')}}/>
           </div>
        </form>
      )
}

     </div>
   </div>
  );
}; 
     
export default Dashboard;