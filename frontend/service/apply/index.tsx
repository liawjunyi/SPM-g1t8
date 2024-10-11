import { gql } from "@apollo/client";

export async function createRequest(
  staffId: number,
  type: string,
  date: Array<string>,
  reason?: string,
  files?: Array<File>
) {
  // The GraphQL mutation string for file upload
  const gqlString = `
    mutation createRequest(
      $staffId: Int!,
      $reason: String,
      $type: String!,
      $date: [String!]!,
      $files: [Upload!]
    ) {
      createRequest(
        staffId: $staffId,
        reason: $reason,
        type: $type,
        date: $date,
        files: $files
      ) {
        success
        message
      }
    }
  `;

  // Create a FormData object to handle the multipart request
  const formData = new FormData();

  // Add the query and variables as part of the form data
  formData.append(
    "operations",
    JSON.stringify({
      query: gqlString,
      variables: {
        staffId: staffId,
        reason: reason || null,
        type: type,
        date: date,

        files: files ? files.map((file) => file) : [],
      },
    })
  );

  if (files && files.length > 0) {
    const map: { [key: string]: string[] } = {};
    files.forEach((file, index) => {
      map[index] = [`variables.files.${index}`]; // Correct 'variables' typo
    });

    formData.append("map", JSON.stringify(map));

    files.forEach((file, index) => {
      formData.append(`variables.files.${index}`, file);
    });
  }

  // Send the fetch request with multipart/form-data
  const res = await fetch("http://localhost:5002/requests", {
    method: "POST",
    body: formData, // No need for 'Content-Type' header, FormData handles that
  });

  const data = await res.json();
  return data;
}
