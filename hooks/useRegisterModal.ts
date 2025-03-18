import { create } from "zustand";


interface IRegisterModal {
    isOpen:boolean;
    onClose:()=>void;
    onOpen:()=>void;
}


const useRegisterModal = create<IRegisterModal>((set)=>({
    isOpen:false,
    onClose:()=> set({isOpen:false}),
    onOpen:()=> set({isOpen:true}),
}))

export default useRegisterModal;