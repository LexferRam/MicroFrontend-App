import React from 'react'
import { Text, View } from '@react-pdf/renderer';
import styles from 'components/Core/PDF/comparePDFStyles';

export default function ConditionHumanTextPiramide() {
  return (
    <>
      <View style={styles.textNote}>
        <View style={styles.textNoteCondition}>

          <View style={styles.textNoteSection}>
            <Text style={styles.boldText}>Observaciones generales :</Text>
            <Text> 1.	La emisión de la póliza estará sujeta al análisis de la solicitud, la declaración de salud debe ser llenada y firmada por el titular de la póliza.
            </Text>
            <Text> 2.	La aceptación y emisión del riesgo dependerá del análisis que la compañía realice de acuerdo a la declaración de salud.</Text>
          </View>
          <View style={styles.textNoteSection}>
            <Text style={styles.boldText}>Condiciones Particulares del producto de Hospitalización, Cirugía y Maternidad.</Text>
            <Text>  1. El grupo posible a Asegurar será Titular, Cónyuge y Padre hasta los 69 años. Hijos, nietos, sobrinos y Hermanos hasta 25 años. Demás parentescos: estarán sujetos a Revisión por parte de la compañía de seguros previa presentación de dependencia económica hasta los 25 años.</Text>
            <Text>  2.	La cobertura de Maternidad aplica solo para Titulares, cónyuges femeninas entro 18 y 50 años.</Text>
            <Text>  3.	No aplica la suscripción para menores de edad solos en los planes donde no se presenta opción.</Text>
            <Text>  4.	Plazos de espera y exclusiones temporales según condicionado Único de Salud.</Text>
            <Text>  5.	Aplica protocolo medico a partir de los 65 años:</Text>
            <Text>  -	Todo aspirante masculino mayor o igual a 65 años deberán consignar: Exámenes de laboratorio (Perfil 20, perfil lipídico, PSA total y libre), ecosonograma abdominal y pélvico, radiografía de tórax, PA y Lat. Izq. Electrocardiograma en reposo, evaluación médica integral (Internista o Cardiólogo). Evaluación urológica.</Text>
            <Text>  -	Todo aspirante femenino mayor o igual a 65 años deberán consignar: Exámenes de laboratorio (Perfil 20, perfil lipídico, PSA total y libre), ecosonograma abdominal y pélvico, radiografía de tórax, PA y Lat. Izq. Electrocardiograma en reposo, evaluación médica integral (Internista o Cardiólogo) (Citología, Mamografía bilateral y eco mamario).</Text>
            <Text>  -	Todo niño menor a 4 años o que sea asegurado solo le debe ser incorporado: Informe médico con antecedentes médicos y situación actual del niño con su esquema de vacunación. Deberá haber sido realizado dentro de los 6 meses anteriores a la fecha de presentación de la solicitud.</Text>
          </View>
          <View style={styles.textNoteSection}>
            <Text style={styles.boldText}>Condiciones Particulares Póliza de Seguros Protección en Emergencia. </Text>
            <Text> 1.	El grupo posible a Asegurar será Titular, Cónyuge y Padre hasta los 85 años. Hijos, nietos, sobrinos y Hermanos hasta 25 años. </Text>
            <Text> 2.	No aplica la suscripción para menores de edad solos en los planes donde no se presenta opción.</Text>
            <Text> 3.	Plazos de Espera de 7 días (ver condiciones particulares).</Text>
          </View>

          <View style={styles.textNoteSection}>
            <Text style={styles.boldText}>Condiciones Particulares de Póliza Funerario. </Text>
            <Text> 1.	Parentesco permisible: Titular, cónyuges, padres, Hijos, Hermanos y Nietos.</Text>
            <Text> 2.	Edad de admisibilidad hasta entre 0 hasta 65 años en planes individuales, el titular debe ser mayor de edad. Edad máxima en los siguientes parentescos: Hijos, Hermanos, Nietos, Sobrinos hasta 25 años.</Text>
            <Text> 3.	Las personas a incluir en la prima por grupo deben ser incluida desde el inicio de la vigencia (no puede incluirse a Posterior).</Text>
            <Text> 4.	Plazos de Espera de (3) tres meses.</Text>
          </View>

          <View style={styles.textNoteSection}>
            <Text style={styles.boldText}>CONDICIONES ACCIDENTES PERSONALES. </Text>
            <Text> 1.	El Asegurado Titular cuya edad sea entre 18 hasta los 75 años.</Text>
            <Text> 2.	Condiciones aplican a personas con ocupación de Personas Riesgo Tipo I y II.</Text>
          </View>

          <View style={styles.textNoteSection}>
            <Text style={styles.boldText}>CONDICIONES DE PAGO ÚNICO POR CÁNCER. </Text>
            <Text> 1.	El Asegurado Titular cuya edad sea entre 18 hasta los 59 años.</Text>
            <Text> 2.	No poseer antecedentes de Cáncer de ningún tipo.</Text>
          </View>
        </View>
      </View>
    </>
  )
}
