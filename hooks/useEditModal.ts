import { create } from "zustand";


interface IEditModal {
    isOpen:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}


const useEditModal = create<IEditModal>((set)=>({
    isOpen:false,
    onClose:()=> set({isOpen:false}),
    onOpen:()=> set({isOpen:true}),
}))

export default useEditModal;