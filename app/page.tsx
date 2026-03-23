import { supabase } from "./lib/supabase/client";


export default async function Home() {
  const { data, error } = await supabase
    .from('Departament')
    .select('*')


  if (error) {
    console.log(error)
  }

  return (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  )
}
