import { useEffect, useState } from 'react'
import { AddContentModal } from '../components/AddContentModal'
import { Button } from '../components/ui/Button'
import { Card } from '../components/Card'
import { PlusIcon } from '../icons/PlusIcon'
import { ShareIcon } from '../icons/ShareIcon'
import { Sidebar } from '../components/Sidebar'
import { useContent } from '../hooks/useContent'
import axios from 'axios'
import { BACKEND_URL, SHARE_BACKEND_URL } from '../config'

export function Dashboard() {
  const [modalOpen, setModalOpen] = useState(false);
  const {contents, refresh} = useContent();

  useEffect(() => {
    refresh();
  }, [modalOpen])

  return ( <div>
      <Sidebar />
      <div className='p-4 ml-72 min-h-screen bg-gray-100 border-2'>
        <AddContentModal open = {modalOpen} onClose={() => {
          setModalOpen(false)
        }}/>
        <div className='flex justify-end gap-4'>
            <Button size='sm' variant='primary' text='Add Content' startIcon={<PlusIcon size='md+1'/>} onClick={() => {setModalOpen(true)}}></Button>
            <Button size='sm' variant='secondary' text='Share brain' startIcon={<ShareIcon size='md'/>} onClick={async() => {
              const response = await axios.post(BACKEND_URL+ "/api/v1/brain/share", {
                share: true
              }, {
                headers: {
                  "Authorization": localStorage.getItem("token")
                }
              });
              const shareUrl = `http://localhost:5173/share/${response.data.hash}`;
              alert(shareUrl);
            }}></Button>
          </div>
        <div className='flex gap-4 flex-wrap'>
          {contents.map(({type, link, title}) => <Card 
          type={type} 
          link={link} 
          title={title}
          ></Card>)}
          
        </div>
      </div>
    </div>
  )
}
