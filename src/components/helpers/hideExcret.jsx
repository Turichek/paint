export default function hideExcret(toImg,setVis,setMode){
    toImg.current.src = "null";
    setVis('hidden');
    setMode('brush');
}