
To pull the latest updates from the remote repository before pushing your changes to the main branch, you follow these steps:

# Step 1: Fetch latest changes
git fetch origin

# Step 2: Pull latest changes from main
git pull origin main

# Step 3: Resolve merge conflicts (if needed)
git add .
git commit -m "Resolved merge conflicts"

# Step 4: Push your changes to your feature branch
git push -u origin branch-berhan

# Step 5: Go to GitHub and create a pull request
  1.Go to your GitHub repository. 

  2.Click on the "Branches" dropdown to ensure you’re on your feature branch (branch-berhan)

  3.GitHub will typically suggest creating a pull request when it detects changes in a branch that is different from main. Click on "Compare & pull request".

# Step 6: Choose the Main Branch as the Target

 In the pull request interface, confirm that the base branch is set to main and the compare branch is set to your feature branch (branch-berhan).

# Step 7: Fill Out the Pull Request Details

1.Provide a meaningful title for your pull request.

2.Add a detailed description of the changes made, and why they are necessary.
3.If your project has templates for PRs, follow the guidelines provided.

# Final Step : Submit the Pull Request

Click the "Create pull request" button to send your PR(Almaz) for review.