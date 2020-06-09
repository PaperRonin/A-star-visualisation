var count;
let correction = 0.000001;

function sleep(ms) {
return new Promise(resolve => setTimeout(resolve, ms));
}

function heuristic(a, b) {
  correction += 0.000001;
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y) - correction;
}

function neighbors(node) {
  let neighborsArr = [];
  if (node.x > 0) {
    neighborsArr.push(map[node.x - 1][node.y]);
  }
  if (node.x < map.length - 1) {
    neighborsArr.push(map[node.x + 1][node.y]);
  }
  if (node.y > 0) {
    neighborsArr.push(map[node.x][node.y - 1]);
  }
  if (node.y < map.length - 1) {
    neighborsArr.push(map[node.x][node.y + 1]);
  }
  return neighborsArr;
}

async function AStarSearch(start, goal) {
  frontier = new PriorityQueue();
  frontier.push(start);
  start.cost_so_far = 0;
  count = 0;
  while (!frontier.isEmpty()) {
    current = frontier.pop();
    count++;

    if (current.type === 'goal') {
      correction = 0.000001;
      current = current.came_from;
      while (current.came_from !== null) {
        current.type = 'path';
        current = current.came_from;
      }
      start.type = 'start';
      draw();
      return goal.cost_so_far;
    }

    neighbors(current).forEach(next => {
      if (next.type !== 'visited' && next.type !== 'wall') {
        new_cost = current.cost_so_far + next.moveCost;
        if (next.cost_so_far === null || new_cost < next.cost_so_far) {
          next.cost_so_far = new_cost;
          next.priority = new_cost + heuristic(goal, next);
          if (next.type !== 'start' &&  next.type !==  'goal') {
            next.type =  'enqueued';
          }
          frontier.push(next);
          next.came_from = current;
        }
      }
    });
    current.type = current.type !== 'start' ? 'visited' : 'start';
    await sleep(50);
    draw();
  }
  start.type = 'start';
  draw();
  return -1;
}

async function dijkstraSearch(start, goal) {
  frontier = new PriorityQueue();
  frontier.push(start);
  start.cost_so_far = 0;
  count = 0;
  while (!frontier.isEmpty()) {
    current = frontier.pop();
    count++;

    if (current.type === 'goal') {
      while (!frontier.isEmpty()) {
        frontier.pop().type = 'enqueued';
      }
      current = current.came_from;
      while (current.came_from !== null) {
        current.type = 'path';
        current = current.came_from;
      }
      start.type = 'start';
      draw();
      return goal.cost_so_far;
    }

    neighbors(current).forEach(next => {
      if (next.type !== 'visited' && next.type !== 'wall') {
        new_cost = current.cost_so_far + next.moveCost;
        if (next.cost_so_far === null || new_cost < next.cost_so_far) {
          next.cost_so_far = new_cost;
          next.priority = new_cost;
          if (next.type !== 'start' &&  next.type !==  'goal') {
            next.type =  'enqueued';
          }
          frontier.push(next);
          next.came_from = current;
        }
      }
    });
    current.type = current.type !== 'start' ? 'visited' : 'start';
    await sleep(10);
    draw();
  }
  start.type = 'start';
  draw();
  return -1;
}

async function heuristicSearch(start, goal) {
  frontier = new PriorityQueue();
  frontier.push(start);
  start.cost_so_far = 0;
  count = 0;
  while (!frontier.isEmpty()) {
    current = frontier.pop();
    count++;

    if (current.type === 'goal') {
      correction = 0.000001;
      while (!frontier.isEmpty()) {
        frontier.pop().type = 'enqueued';
      }
      current = current.came_from;
      while (current.came_from !== null) {
        current.type = 'path';
        current = current.came_from;
      }
      start.type = 'start';
      draw();
      return goal.cost_so_far;
    }
    neighbors(current).forEach(next => {
      if (next.type !== 'visited' && next.type !== 'wall') {
        new_cost = current.cost_so_far + next.moveCost;
        if (next.cost_so_far === null || new_cost < next.cost_so_far) {
          next.cost_so_far = current.cost_so_far + next.moveCost;
          next.priority = heuristic(goal, next);
          if (next.type !== 'start' &&  next.type !==  'goal') {
            next.type =  'enqueued';
          }
          frontier.push(next);
          next.came_from = current;
        }
      }
    });
    current.type = current.type !== 'start' ? 'visited' : 'start';
    await sleep(50);
    draw();
  }
  start.type = 'start';
  draw();
  return -1;
}
