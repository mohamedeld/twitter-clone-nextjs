import { create } from "zustand";


interface ILoginModal {
    isOpen:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}


const useLoginModal = create<ILoginModal>((set)=>({
    isOpen:false,
    onClose:()=> set({isOpen:false}),
    onOpen:()=> set({isOpen:true}),
}))

export default useLoginModal;