import React, { useEffect, useState, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlay,faPause}  from '@fortawesome/free-solid-svg-icons';
import {faForward}  from '@fortawesome/free-solid-svg-icons';
import {faBackward}  from '@fortawesome/free-solid-svg-icons';


//include images into your bundle
import rigoImage from "../../img/rigo-baby.jpg";

//create your first component
const Home = () => {

	useEffect(()=>{
		obtenerCanciones();

	},[])


	const audioRef = useRef();
	let [listaCanciones,setlistaCanciones] = useState([]);
	let [cancionActive,setcancionActive] = useState(-1);
	let [baseUrl,setBaseUrl] = useState('https://playground.4geeks.com');
	// const [isPlaying, setIsPlaying] = useState(true);
	const [iconPlay, setIconPlay] = useState(<FontAwesomeIcon icon={faPlay} />);
	


	const playMusic = () => {
		if (audioRef.current.paused) {
			setIconPlay(<FontAwesomeIcon icon={faPause} />)
			audioRef.current.play();	
		}
		else{
			setIconPlay(<FontAwesomeIcon icon={faPlay} />);
			audioRef.current.pause();
		}
	};



	const nextMusic = () => {
		if (cancionActive>=18) {
			cancionActive=0;
			audioRef.current.src = baseUrl+listaCanciones[cancionActive].url;
			setcancionActive(cancionActive+1);
			audioRef.current.play();
		}
		else{
			setcancionActive(cancionActive+1);
		}
		// console.log(listaCanciones);
		audioRef.current.src = baseUrl+listaCanciones[cancionActive].url;
		audioRef.current.play();
	}
	// console.log(cancionActive);


	const previousMusic = () => {
		if (cancionActive<=1 ) {
			cancionActive=listaCanciones.length;
			audioRef.current.src = baseUrl+listaCanciones[cancionActive].url;
			setcancionActive(listaCanciones.length);
			audioRef.current.play();
		}
		else{
			setcancionActive(cancionActive-1);
		}
		// setcancionActive(cancionActive-1);
		// console.log(cancionActive);
		audioRef.current.src = baseUrl+listaCanciones[cancionActive].url;
		audioRef.current.play();
	}

	const obtenerCancion = (id,urlcancion) => {
		// console.log(id);
		
		audioRef.current.src = baseUrl+urlcancion;  // 
		audioRef.current.play();
		setcancionActive(id)
		setIconPlay(<FontAwesomeIcon icon={faPause} />)
	  };

	



	function obtenerCanciones() {
		fetch(
			'https://playground.4geeks.com/sound/songs',{
				method: 'GET',
			})
		.then((response)=>response.json())
		.then((data)=>setlistaCanciones(data.songs))
		.catch((error)=>console.log(error));
	}
   


	return (
		<div className="container" id="contenedor">
			{/* <h1>Hola</h1> */}
			{/* <button data-bs-toggle="modal" data-bs-target="#staticBackdrop">My Playlist</button> */}
			<div className="container my-5 py-5 ">
						<div className="container my-5 pb-5 pt-2 px-1 justify-content-center" id="contenedor-lista">
							<ol className="text-start px-0 ms-4" id="ol-group">													       {/*()=> para que no se renderice todo con cada map */}
								{listaCanciones.map((item)=> (<li className="justify-content-between my-3 border-opacity-10" key={item.id} id={item.id} onClick={()=>obtenerCancion(item.id,item.url)}>{item.name} </li>))}			
							</ol>
							{/* <button onClick={()=>console.log(listaCanciones)}></button> */}
							<audio ref={audioRef} > 
								<source src={audioRef} type="audio/mp3" />
							</audio>
							
						</div>
						<div className="container justify-content-center w-50 d-flex text-center gap-4">
								<div className="botonera" onClick={previousMusic}><FontAwesomeIcon icon={faBackward} /></div>
								<div className="botonera" onClick={playMusic}>{iconPlay}</div>	
								<div className="botonera" onClick={nextMusic}><FontAwesomeIcon icon={faForward} /></div>		
							</div>				
			</div>
		</div>
	);

};

export default Home;
