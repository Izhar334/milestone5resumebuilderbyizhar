document
  .getElementById("resumeForm")
  ?.addEventListener("submit", function (event) {
    event.preventDefault();
    // Retrieve form elements with type assertions
    const profilePictureInput = document.getElementById(
      "profilePicture"
    ) as HTMLInputElement;
    const nameElement = document.getElementById("name") as HTMLInputElement;
    const emailElement = document.getElementById("email") as HTMLInputElement;
    const phoneElement = document.getElementById("phone") as HTMLInputElement;
    const educationElement = document.getElementById(
      "education"
    ) as HTMLTextAreaElement;
    const experienceElement = document.getElementById(
      "experience"
    ) as HTMLTextAreaElement;
    const skillsElement = document.getElementById(
      "skills"
    ) as HTMLTextAreaElement;
    const projectElement = document.getElementById(
      "project"
    ) as HTMLInputElement;
    
    // Check that elements are present
    if (
      profilePictureInput &&
      nameElement &&
      emailElement &&
      phoneElement &&
      educationElement &&
      experienceElement &&
      skillsElement &&
      projectElement
    ) {
      // Get values from the form
      const name = nameElement.value;
      const email = emailElement.value;
      const phone = phoneElement.value;
      const education = educationElement.value;
      const experience = experienceElement.value;
      const skills = skillsElement.value;
      const project = projectElement.value;

      

      // Picture element
      const profilePictureFile = profilePictureInput.files?.[0];
      const profilePictureURL = profilePictureFile
        ? URL.createObjectURL(profilePictureFile)
        : "";
      // Create the resume output
      const resumeOutput = `
            <h2>Resume</h2>
            ${
              profilePictureURL
                ? `<img src="${profilePictureURL}" alt="Profile Picture" class="profilePicture">`
                : ""
            }
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone}</p>
            <h3>Education</h3>
            <p>${education}</p>
            <h3>Work Experience</h3>
            <p>${experience}</p>
            <h3>Skills</h3>
            <p>${skills}</p>
            <h3>Project</h3>
            <p>${project}</p>
        `;
    

      // Add validation for required fields
      // Get the resume output element
      const resumeOutputElement = document.getElementById("resumeOutput");
      if (resumeOutputElement) {
        resumeOutputElement.innerHTML = resumeOutput;
        resumeOutputElement.classList.remove("hidden");
        // created container for button
        const buttonContainer = document.createElement("div");
        buttonContainer.classList.add("button-container");
        // add download button pdf
        const downloadButton = document.createElement("button");
        downloadButton.textContent = "Download as PDF";
        downloadButton.addEventListener("click", () => {
            window.print();
        });
        buttonContainer.appendChild(downloadButton);
        // shareable link button
        const shareLinkButton = document.createElement("button");
        shareLinkButton.textContent = "Shareable Link";
        shareLinkButton.addEventListener("click", async () => {
            try{
                const shareLinkb = `https://yourdomain.com/${name.replace(/\s+/g,"_")}_cv.html`;
                await navigator.clipboard.writeText(shareLinkb);
            alert("Shareable link copied successfully")
            } catch (err) {
                console.error("Failed to copy to clipboard:", err);
                alert("Failed to copy to clipboard")
            }
        })
        buttonContainer.appendChild(shareLinkButton);
      }else{
        console.error("Resume output element not found.");
      }
    } else {
      console.error("One or more form elements are missing.");
    }
  });
