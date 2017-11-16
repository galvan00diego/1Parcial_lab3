<?php

$caso = isset($_POST['caso']) ? $_POST['caso'] : NULL;
switch($caso){
   
case 1:
    if(isset($_POST["valorJ"]))
    {
        $json=json_decode($_POST["valorJ"]);

        $nombreFoto = date("Gis").".".pathinfo($_FILES["foto"]["name"] , PATHINFO_EXTENSION);
        $rutaFoto = "./BACKEND/fotos/".$nombreFoto;
        $json->foto = $nombreFoto;
        $json=json_encode($json);
        move_uploaded_file($_FILES["foto"]["tmp_name"] , $rutaFoto);
        if(file_exists("./BACKEND/autos.json")===false)
        {
            $ar=fopen("./BACKEND/autos.json","a");
            fwrite($ar,"[".$json."]");
            fclose($ar);
            echo "Se ha cargado correctamente";
        }
        else
        {
            //LEO EL ARCHIVO
            $ar=fopen("./BACKEND/autos.json","r");
            $lectura=fread($ar,filesize("./BACKEND/autos.json"));
            $lectura=substr($lectura,0,-1);
            fclose($ar);
            //ESCRIBO EL ARCHIVO
            $ar=fopen("./BACKEND/autos.json","w");
            fwrite($ar,$lectura.",".$json."]");
            fclose($ar);
            echo "Se ha cargado correctamente";
        }
    }
    else
    echo "No se pudo cargar";
   
    break;

case 2:
    $ar=fopen("./BACKEND/autos.json","r");
    $retornoJson=fread($ar,filesize("./BACKEND/autos.json"));
    echo $retornoJson;
    break;

    case 5:
    $ar=fopen("./BACKEND/autosEliminados.json","r");
    $retornoJson=fread($ar,filesize("./BACKEND/autosEliminados.json"));
    echo $retornoJson;
    break;

    case 6:
    $ar=fopen("./BACKEND/autos.json","r");
    $retornoJson=fread($ar,filesize("./BACKEND/autos.json"));

    echo $retornoJson;
    break;

    // case 3:
    // if(isset($_POST["valorJ"]))
    // {
    //     $json=json_decode($_POST["valorJ"]);
    //     $ar=fopen("./BACKEND/autos.json","r");
    //     $listaAutos=json_decode(fread($ar,filesize("./BACKEND/autos.json")));
    //     $listaModificada=array();

    //     for($i=0; $i<count($listaAutos); $i++)
	// 	{
	// 		if($listaAutos[$i]->patente == $json->patente)
	// 		{
	// 			$imgBorrada = trim("archivos/".$listaAutos[$i]->foto);
	// 			continue;
	// 		}
	// 		$ListaModificada[$i] = $listaAutos[$i];
	// 	}

    //     array_push($ListaModificada, $json);
    //     unlink($imgBorrada);
    //     $ar = fopen("BACKEND/autos.json", "w");
        
    //     //-----------------------ESCRIBO EN EL ARCHIVO---------------------------------------------------------
    //             foreach($ListaModificada as $item)
    //             {
    //                 $auto="'marca':'$item->marca','patente':'$item->patente','precio':'$item->precio','color':'$item->color','foto':$item->foto";
    //                 $lineas = fwrite($ar,$auto );
                    
    //                 if($lineas < 1)
    //                 {
    //                     $resultado = FALSE;
    //                     break;
    //                 }
    //             }
        
    //     //CIERRO EL ARCHIVO
    //     fclose($ar);
    // break;

    case 3:
    if(isset($_POST["patenteE"]))
    $patenteEliminar=$_POST["patenteE"];
    
    $ar=fopen("./BACKEND/autos.json","r"); //ABRIMOS EL ARCHIVO JSON
    $traerAutos=json_decode(fread($ar,filesize("./BACKEND/autos.json"))); // CREAMOS UN ARRAY
    fclose($ar);
    $listaModificada=array(); // CREAMOS LA LISTA FINAL
    
    for($i=0;$i<=count($traerAutos);$i++)
    { 
        
        if($patenteEliminar==$traerAutos[$i]->patente)
        {
            $autoEliminado=$traerAutos[$i];
            unset($traerAutos[$i]); // ELIMINAMOS EL IGUAL
            echo "Se elimino correctamente, reasignarlo...";
        }
        else
        array_push($listaModificada,$traerAutos[$i]); // SE AGREGA DE A UN ELEMENTO, PARA OBTENER UNA LISTA CORRECTA PARA ENCODEAR A JSON
    }
    $ar=fopen("./BACKEND/autos.json","w"); // VOLVEMOS A ABRIR EL ARCHIVO EN MODO ESCRITURA
    fwrite($ar,json_encode($listaModificada));  // SOBRESCRIBIMOS TODA LA LISTA NUEVAMENTE
    fclose($ar);
    
   break;


    case 4: // ELIMINAR AUTO
        if(isset($_POST["patenteE"]))
        {
            $patenteEliminar=$_POST["patenteE"];
            
            $ar=fopen("./BACKEND/autos.json","r"); //ABRIMOS EL ARCHIVO JSON
            $traerAutos=json_decode(fread($ar,filesize("./BACKEND/autos.json"))); // CREAMOS UN ARRAY
            fclose($ar);
            $listaModificada=array(); // CREAMOS LA LISTA FINAL
            $autoEliminado=new stdClass();
            for($i=0;$i<=count($traerAutos);$i++)
            { // BUSCAMOS EL DNI
                
                if($patenteEliminar==$traerAutos[$i]->patente)
                {
                    $autoEliminado=$traerAutos[$i];
                    rename("BACKEND/fotos/".$traerAutos[$i]->foto,"BACKEND/fotoseliminadas/".$traerAutos[$i]->foto);
                    unset($traerAutos[$i]); // ELIMINAMOS EL IGUAL
                    echo "Se elimino correctamente";
                }
                else
                array_push($listaModificada,$traerAutos[$i]); // SE AGREGA DE A UN ELEMENTO, PARA OBTENER UNA LISTA CORRECTA PARA ENCODEAR A JSON
            }
            $ar=fopen("./BACKEND/autos.json","w"); // VOLVEMOS A ABRIR EL ARCHIVO EN MODO ESCRITURA
            fwrite($ar,json_encode($listaModificada));  // SOBRESCRIBIMOS TODA LA LISTA NUEVAMENTE
            fclose($ar);

             /********************************************************** */
             if(file_exists("./BACKEND/autosEliminados.json")===false)
             {
                 $ar=fopen("./BACKEND/autosEliminados.json","a");
                 fwrite($ar,"[".json_encode($autoEliminado)."]");
                 fclose($ar);
                 
             }
             else
             {
                 //LEO EL ARCHIVO
                 $ar=fopen("./BACKEND/autosEliminados.json","r");
                 $lectura=fread($ar,filesize("./BACKEND/autosEliminados.json"));
                 $lectura=substr($lectura,0,-1);
                 fclose($ar);
                 //ESCRIBO EL ARCHIVO
                 $ar=fopen("./BACKEND/autosEliminados.json","w");
                 fwrite($ar,$lectura.",".json_encode($autoEliminado)."]");
                 fclose($ar);
                 
             }
             /********************************************************** */
        }
        else
        echo "Error. No se recibio nada.";
}
