export async function load({ params }) {

	try {

		// If you want to keep the supabaseClient call and just add additional Lambda processing:
		 const { data: note, error } = await supabaseClient
		 	.from('pages')
		 	.select('*')
		 	.eq('id', params.slug)
		 	.single();


		// If you're replacing the supabaseClient call:
		const lambdaResponse = await fetch('https://fcuexopxqi.execute-api.us-east-2.amazonaws.com', {
			method: 'POST', // or 'GET' depending on your Lambda function setup
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({ slug: params.slug }) // if you need to pass the slug to Lambda
		});

		if (!lambdaResponse.ok) {
			throw new Error(`Lambda call failed with status: ${lambdaResponse.status}`);
		}

		const note2 = await lambdaResponse.json();

		return note;

	} catch (e) {
		throw Error(`Could not find space with id ${params.slug}: ${e.message}`);
	}
}
