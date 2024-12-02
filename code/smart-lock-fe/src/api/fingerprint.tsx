export async function createFingerprint(id: string) {
  try {
    const url = 'https://smart-lock-embedded-project-default-rtdb.asia-southeast1.firebasedatabase.app/fingerprint/action.json';
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: 'create',
        index: id
      })
    });
    if (response.ok) {
      console.log("Fingerprint created successfully");
    } else {
      console.log("Fingerprint creation failed");
    }
  } catch (e) {
    console.log(e);
  }
}

export async function deleteFingerprint(id: string) {
  try {
    const url = 'https://smart-lock-embedded-project-default-rtdb.asia-southeast1.firebasedatabase.app/fingerprint/action.json';
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        command: 'delete',
        index: id
      })
    });
    if (response.ok) {
      console.log("Fingerprint created successfully");
    } else {
      console.log("Fingerprint creation failed");
    }
  } catch (e) {
    console.log(e);
  }
}