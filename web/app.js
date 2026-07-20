function getTimestamp() {
  const now = new Date();

  return now.getFullYear() + "-" +
    String(now.getMonth() + 1).padStart(2, "0") + "-" +
    String(now.getDate()).padStart(2, "0") + " " +
    String(now.getHours()).padStart(2, "0") + ":" +
    String(now.getMinutes()).padStart(2, "0") + ":" +
    String(now.getSeconds()).padStart(2, "0");
}

async function runHealthCheck() {
  const cluster = document.getElementById("cluster_mgmt_ip").value;
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (!cluster || !username || !password) {
    alert("Please enter Cluster IP, Username and Password");
    return;
  }

  document.getElementById("headerInfo").innerText =
    `Cluster: ${cluster} | Type: HEALTH CHECK | Timestamp: ${getTimestamp()}`;

  document.getElementById("cardCluster").innerText = cluster;
  document.getElementById("cardTotal").innerText = "Running";
  document.getElementById("cardCompleted").innerText = "Running";
  document.getElementById("cardErrors").innerText = "--";

  document.getElementById("jobOutput").innerText =
    "Submitting NetApp Health Check job to Ansible Forms...";

  try {
    const response = await fetch("/api/run-hc", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        cluster_mgmt_ip: cluster,
        username: username,
        password: password
      })
    });

    const data = await response.json();

    document.getElementById("jobOutput").innerText =
      JSON.stringify(data, null, 2);

    document.getElementById("cardTotal").innerText = "13";
    document.getElementById("cardCompleted").innerText = "Check Job";
    document.getElementById("cardErrors").innerText = "Check Report";

    const reportUrl = `/reports/${cluster}_HC_Report.html`;

    const reportLink = document.getElementById("reportLink");
    reportLink.href = reportUrl;
    reportLink.style.display = "inline-block";
    reportLink.innerText = "View HTML Report";

  } catch (error) {
    document.getElementById("jobOutput").innerText =
      "Failed to run job:\n" + error;
  }
}

function searchReport() {
  alert("Search will work after report data is loaded into this page.");
}

function clearSearch() {
  document.getElementById("searchInput").value = "";
}

function showErrorsOnly() {
  alert("This can be connected to report filtering.");
}

function showAll() {
  alert("Showing all checks.");
}
