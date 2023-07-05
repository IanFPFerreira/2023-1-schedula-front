import json
import sys
import urllib.request
from datetime import datetime


def generate_metrics():
    base_url = "https://sonarcloud.io/api/measures/component_tree?component=IanFPFerreira_"  # noqa 501
    prefix = "fga-eps-mds"
    metrics = [
        "files",
        "functions",
        "complexity",
        "comment_lines_density",
        "duplicated_lines_density",
        "coverage",
        "ncloc",
        "tests",
        "test_errors",
        "test_failures",
        "test_execution_time",
        "security_rating"
    ]

    # NAO RELE A MÃO NISSO AQUI
    repository_name = sys.argv[1]
    repository_version = sys.argv[2]

    if 'id' in repository_version:
        date = datetime.strptime(repository_version[3:].split("_")[1].replace("a", "-").replace("p", ":"), '%Y-%m-%dT%H:%M:%SZ')  # noqa 501
        repository_version = repository_version[3:].split("_")[0]
    else:
        date = datetime.now()

    underlined_repo_name = repository_name[:16] + \
        repository_name[16:].replace('-', "_")
    url = f'{base_url}{repository_name}&metricKeys={",".join(metrics)}&ps=500'
    with urllib.request.urlopen(url) as res:
        data = json.load(res)
        date_padrao_hilmer = f"{date.month:02d}-{date.day:02d}-{date.year}-{date.hour}-{date.minute}-{date.second}"  # noqa 501

        filename = f"{prefix}-{underlined_repo_name}-{date_padrao_hilmer}-{repository_version}.json"  # noqa 501
        print(filename)
        with open(filename, "w") as file:
            json.dump(data, file)


if __name__ == "__main__":
    generate_metrics()
