import React, { useEffect,useState } from 'react'
import Axios from 'axios'
import TableMaterial from 'components/Core/TableMaterial/TableMaterial'
import CardPanel from 'components/Core/Card/CardPanel'
import DetailPanel from './DetailPanel';

export default function TeamManagementList(props) {
  const [workload, setWorkload] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  async function getTeamData() {
    const { data } = await Axios.post('/dbo/team_manager/get_workload');
    setWorkload(data.p_cur_data)
    setIsLoading(false)
  }

  useEffect(() => {
    getTeamData()
  }, [])

  const handleGetTeamData = () => {
    getTeamData()
  };
  return (
    <CardPanel titulo={'Gestión de Equipo'} icon="list" iconColor="primary">

      <TableMaterial
        options={{
          pageSize: 10,
          search: true,
          toolbar: true,
          sorting: false,
          headerStyle: { textAlign: 'center' }
        }}
        columns={[
          { title: 'Nombre y Apellido', field: 'NAME', cellStyle: { textAlign: 'center' } },
          { title: 'Usuario', field: 'USERNAME', cellStyle: { textAlign: 'center' } },
          { title: 'Número de Casos', field: 'NUMCASES', cellStyle: { textAlign: 'center' } }
        ]}
        data={workload}
        detailPanel={(rowData) => {
          return (
            <DetailPanel rowData={rowData} handleGetTeamData={handleGetTeamData} />
          )
        }}
        actions={[
          {
            icon: 'refresh',
            tooltip: 'Actualizar',
            isFreeAction: true,
            onClick: (event) => handleGetTeamData()
          }
        ]}
        isLoading={isLoading}
      />

    </CardPanel>
  )
}